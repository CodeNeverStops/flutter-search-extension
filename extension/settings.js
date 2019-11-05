const settings = {
    get openType() {
        return localStorage.getItem("open-type") || "current-tab";
    },
    set openType(type) {
        localStorage.setItem("open-type", type);
    },
    get mirror() {
        return localStorage.getItem("mirror") || "official";
    },
    set mirror(mirror) {
        localStorage.setItem("mirror", mirror);
    }
}