import { apiSetions } from "../apis/sections";

const actionSetions = {
    returnAllSection: (data) => apiSetions.getAll(data).then((response) => response),
    createSection: (data) => apiSetions.post(data).then((response) => response),
    editSection: (data) => apiSetions.put(data).then((response) => response),
}

export default actionSetions;