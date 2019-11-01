const settings = {
    get openType() {
        return localStorage.getItem("open-type") || "current-tab";
    },
    set openType(type) {
        localStorage.setItem("open-type", type);
    }
}