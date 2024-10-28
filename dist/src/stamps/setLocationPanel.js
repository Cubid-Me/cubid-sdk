"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSearchPanel = void 0;
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
const react_toastify_1 = require("react-toastify");
const input_1 = require("../component/input");
require("react-phone-input-2/lib/style.css");
const alert_dialog_1 = require("../component/alert-dialog");
const LocationSearchPanel = ({ open, onClose, apikey, page_id, uuid, fetchStamps }) => {
    const [locationInput, setLocationInput] = react_1.default.useState("");
    const [allLocations, setAllLocations] = react_1.default.useState([]);
    const [selectedLocation, setSelectedLocation] = react_1.default.useState(null);
    // Debounced function for location search
    const handleLocationSearch = (0, lodash_debounce_1.default)((input) => __awaiter(void 0, void 0, void 0, function* () {
        setSelectedLocation(null);
        if (input.length >= 2) {
            try {
                const response = yield axios_1.default.post(`https://passport.cubid.me/api/v2/search-location`, { location_input: input, apikey });
                setAllLocations(response.data);
            }
            catch (error) {
                react_toastify_1.toast.error("Error fetching locations.");
            }
        }
    }), 500);
    const handleLocationChange = (e) => {
        setLocationInput(e.target.value);
        handleLocationSearch(e.target.value);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, open && (react_1.default.createElement(alert_dialog_1.AlertDialog, { open: open },
        react_1.default.createElement(alert_dialog_1.AlertDialogContent, { style: { borderRadius: 10 }, className: "bg-white rounded-xl shadow-lg overflow-hidden max-w-sm h-[400px] mx-auto p-6" },
            react_1.default.createElement(alert_dialog_1.AlertDialogHeader, { className: "mb-4" },
                react_1.default.createElement(alert_dialog_1.AlertDialogTitle, { className: "text-2xl font-bold text-gray-800" }, "Location Search"),
                react_1.default.createElement(alert_dialog_1.AlertDialogDescription, { className: "mt-2 text-gray-600" },
                    react_1.default.createElement(input_1.Input, { placeholder: "Search and select home or work address", value: locationInput, onChange: handleLocationChange, className: "mt-4 w-full border border-gray-300 rounded-lg p-2 shadow focus:outline-none focus:shadow-outline" }),
                    react_1.default.createElement("div", { className: "h-[200px] overflow-y-auto mt-3" }, allLocations.map((item) => (react_1.default.createElement("div", { key: item.name, onClick: () => {
                            setLocationInput(item.formatted_address);
                            setSelectedLocation(item);
                        }, className: `cursor-pointer pb-2 ${(selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.formatted_address) === item.formatted_address ? "font-bold" : ""}` }, item.formatted_address)))))),
            react_1.default.createElement(alert_dialog_1.AlertDialogFooter, { className: "mt-6 flex absolute bottom-[10px] right-[10px] justify-between space-x-2" },
                react_1.default.createElement(alert_dialog_1.AlertDialogCancel, { onClick: onClose, style: { borderRadius: 10 }, className: "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md" }, "Cancel"),
                react_1.default.createElement(alert_dialog_1.AlertDialogCancel, { onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield axios_1.default.post('https://passport.cubid.me/api/v2/identity/add_stamp', {
                            page_id,
                            stamp_type: "address",
                            stampData: Object.assign({ uniquevalue: `${uuid}-${selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.formatted_address}`, identity: selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.formatted_address }, selectedLocation),
                            user_data: { uuid },
                        });
                        onClose();
                        fetchStamps();
                    }), style: { borderRadius: 10 }, disabled: !Boolean(selectedLocation), className: "bg-blue-500 hover:bg-gray-400 text-white py-2 px-4 rounded-md" }, "Save Location")))))));
};
exports.LocationSearchPanel = LocationSearchPanel;
