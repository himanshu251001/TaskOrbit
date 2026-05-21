import React, { useMemo, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { Country, City } from "country-state-city";
import { useFormContext, Controller } from "react-hook-form";

const LocationSelect = ({
  label = "Location",
  name = "location",
  placeholder = "Search location...",
  required = false,
  disabled = false,
  icon = null,
}) => {
  const { control, formState: { errors } } = useFormContext();

  // Load countries once for mapping
  const countryMap = useMemo(() => {
    const countries = Country.getAllCountries();
    return countries.reduce((acc, country) => {
      acc[country.isoCode] = country.name;
      return acc;
    }, {});
  }, []);

  const formatLabel = useCallback((value) => {
    if (!value) return "";
    const parts = value.split(", ");
    if (parts.length < 2) return value;
    const [city, countryCode] = parts;
    const countryName = countryMap[countryCode] || countryCode;
    return `${city}, ${countryName}`;
  }, [countryMap]);

  const filterCities = useCallback((inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    const searchStr = inputValue.toLowerCase();
    const cities = City.getAllCities();

    const filtered = [];
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const cityName = city.name.toLowerCase();
      const countryCode = city.countryCode.toLowerCase();

      if (cityName.includes(searchStr) || countryCode.includes(searchStr)) {
        filtered.push({
          value: `${city.name}, ${city.countryCode}`,
          label: `${city.name}, ${countryMap[city.countryCode] || city.countryCode}`,
        });
      }

      if (filtered.length >= 50) break;
    }

    return filtered;
  }, [countryMap]);

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterCities(inputValue));
    }, 150);
  };

  const customClassNames = {
    control: ({ isDisabled, isFocused }) =>
      `flex items-center justify-between w-full min-h-[48px] rounded-lg border transition-all duration-200 text-sm ${isDisabled
        ? "bg-base-200/50 border-base-300 cursor-not-allowed"
        : errors[name]
          ? "bg-base-100 border-error ring-1 ring-error"
          : isFocused
            ? "bg-base-100 border-primary ring-2 ring-primary/20"
            : "bg-base-100 border-base-300 hover:border-primary"
      } ${icon ? "pl-8" : "pl-1"}`,
    valueContainer: () => "flex items-center flex-1 flex-wrap px-2 gap-1 relative",
    input: () => "text-base-content py-3",
    placeholder: () => "text-base-content/40 mx-0.5 absolute",
    singleValue: ({ isDisabled }) =>
      `mx-0.5 ${isDisabled ? "text-base-content/50" : "text-base-content"}`,
    menu: () => "bg-base-100 border border-base-300 shadow-xl rounded-lg z-50 overflow-hidden mt-1 absolute w-full left-0",
    menuList: () => "max-h-60 overflow-y-auto",
    option: ({ isFocused, isSelected }) =>
      `cursor-pointer px-4 py-2 text-sm ${isSelected
        ? "bg-primary text-primary-content"
        : isFocused
          ? "bg-primary/10 text-base-content"
          : "bg-transparent text-base-content"
      } active:bg-primary active:text-primary-content`,
    noOptionsMessage: () => "text-base-content/50 text-sm p-4 text-center",
    loadingIndicator: () => "text-primary p-2",
    loadingMessage: () => "text-base-content/50 text-sm p-4 text-center",
    indicatorsContainer: () => "flex items-center text-base-content/50 pr-2",
    clearIndicator: () => "hover:text-base-content cursor-pointer p-1",
    dropdownIndicator: () => "hover:text-base-content cursor-pointer p-1",
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-base-content/80" htmlFor={name}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 z-10 pointer-events-none">
            {icon}
          </span>
        )}
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} is required` : false }}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <AsyncSelect
                ref={ref}
                cacheOptions
                defaultOptions={false}
                loadOptions={loadOptions}
                value={value ? { value: value, label: formatLabel(value) } : null}
                onChange={(val) => onChange(val ? val.value : "")}
                placeholder={placeholder}
                isDisabled={disabled}
                unstyled
                classNames={customClassNames}
                classNamePrefix="location-select"
                noOptionsMessage={({ inputValue }) =>
                  !inputValue || inputValue.length < 2
                    ? "Type at least 2 characters to search..."
                    : "No locations found"
                }
              />
            );
          }}
        />
      </div>

      {errors[name] && (
        <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
      )}
    </div>
  );
};

export default LocationSelect;
