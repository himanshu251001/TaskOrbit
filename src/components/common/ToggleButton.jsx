import { Sun, Moon } from "lucide-react";
const ToggleButton = ({ theme, setTheme }) => {

    return (
        <div className="flex items-center gap-3">
            <span className="font-semibold">
                {theme === "dark" ? <Moon /> : <Sun />}
            </span>

            <input
                type="checkbox"
                className="toggle toggle-lg"
                onChange={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                }

            />
        </div>
    );
}
export default ToggleButton;
