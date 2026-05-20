import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { apiFetch } from "../../utils/api";

/**
 * ChannelSidebar — secondary sidebar showing Groups and Direct Messages.
 * Handles search filtering, channel/DM selection, and displays unread badges.
 */
const ChannelSidebar = ({
  groups,
  directMessages,
  activeChannel,
  onSelectChannel,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dbUsers, setDbUsers] = useState([]);
  const [loadingDbUsers, setLoadingDbUsers] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setDbUsers([]);
      setLoadingDbUsers(false);
      return;
    }
    
    setLoadingDbUsers(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await apiFetch(`/users/search?value=${encodeURIComponent(searchQuery)}`);
        if (res && res.ok) {
          const response = await res.json();
          const newUsers = (response.data || []).filter(
            (u) => !directMessages.some((dm) => dm.id === u.id)
          );
          setDbUsers(newUsers);
        }
      } catch (error) {
        console.error("Error fetching db users:", error);
      } finally {
        setLoadingDbUsers(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, directMessages]);

  const capitalize = (str) => 
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDMs = directMessages.filter((dm) =>
    dm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unaddedDbUsers = dbUsers.filter(
    (u) => !directMessages.some((dm) => dm.id === u.id)
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-72 bg-base-200 border-r border-base-200
          transform transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:z-auto md:w-64 lg:w-72
          flex flex-col min-h-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        role="complementary"
        aria-label="Channels and direct messages"
      >
        <div className="p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2  "
            />
            <input
              id="teams-channel-search"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm w-full pl-9 pr-3 py-2 bg-base-200/50 border border-gray-300
                         rounded-lg text-sm placeholder:text-base-content/40
                         focus:outline-none focus:border-primary/40 
                         transition-colors"
              aria-label="Search channels and contacts"
            />
          </div>
        </div>

        {/* Scrollable channel list */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Groups */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-3">
              Groups
            </h3>
            <ul className="flex flex-col gap-0.5">
              {filteredGroups.length === 0 && (
                <li className="text-xs text-base-content/40 py-2 px-3">
                  No groups found
                </li>
              )}
              {filteredGroups.map((group) => {
                const isActive =
                  activeChannel?.id === group.id &&
                  activeChannel?.type === "group";

                return (
                  <li key={group.id}>
                    <button
                      id={`channel-${group.id}`}
                      onClick={() => {
                        onSelectChannel({ ...group, type: "group" });
                        onClose?.();
                      }}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-150 cursor-pointer
                        ${
                          isActive
                            ? "bg-primary text-primary-content"
                            : "text-base-content hover:bg-base-200"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="truncate">{capitalize(group.name)}</span>
                      {group.unread > 0 && !isActive && (
                        <span className="ml-auto badge badge-xs badge-primary">
                          {group.unread}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Direct Messages */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-3">
              Direct Messages
            </h3>
            <ul className="flex flex-col gap-0.5">
              {filteredDMs.length === 0 && unaddedDbUsers.length === 0 && !loadingDbUsers && (
                <li className="text-xs text-base-content/40 py-2 px-3">
                  No contacts found
                </li>
              )}
              {filteredDMs.map((dm) => {
                const isActive =
                  activeChannel?.id === dm.id &&
                  activeChannel?.type === "dm";

                return (
                  <li key={dm.id}>
                    <button
                      id={`dm-${dm.id}`}
                      onClick={() => {
                        onSelectChannel({ ...dm, type: "dm" });
                        onClose?.();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-150 cursor-pointer
                        ${
                          isActive
                            ? "bg-primary text-primary-content"
                            : "text-base-content hover:bg-base-200"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        {dm.avatar ? (
                          <img
                            src={dm.avatar}
                            alt={dm.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm uppercase ${
                            isActive 
                              ? "bg-primary-content/20 text-primary-content" 
                              : "bg-primary/20 text-primary"
                          }`}>
                            {dm.name ? dm.name.charAt(0) : "?"}
                          </div>
                        )}
                      </div>
                      <span className="truncate">{dm.name}</span>
                    </button>
                  </li>
                );
              })}

              {loadingDbUsers && (
                <li className="text-xs text-base-content/40 py-2 px-3 flex justify-center">
                  <span className="loading loading-spinner loading-xs"></span>
                </li>
              )}

              {unaddedDbUsers.map((user) => {
                const isActive =
                  activeChannel?.id === user.id &&
                  activeChannel?.type === "dm";

                return (
                  <li key={`db-${user.id}`}>
                    <button
                      id={`db-dm-${user.id}`}
                      onClick={() => {
                        onSelectChannel({ ...user, type: "dm" });
                        onClose?.();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-150 cursor-pointer
                        ${
                          isActive
                            ? "bg-primary text-primary-content"
                            : "text-base-content hover:bg-base-200"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm uppercase ${
                            isActive 
                              ? "bg-primary-content/20 text-primary-content" 
                              : "bg-primary/20 text-primary"
                          }`}>
                            {user.name ? user.name.charAt(0) : "?"}
                          </div>
                        )}
                      </div>
                      <span className="truncate">{user.name}</span>
                      <span className="ml-auto text-[10px] uppercase font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">New</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>


      </aside>
    </>
  );
};

export default ChannelSidebar;
