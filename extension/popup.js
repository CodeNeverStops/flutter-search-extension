document.addEventListener('DOMContentLoaded', function() {
    const openTypeSelect = document.querySelector('select[name="open-type"]');
    if (settings.openType) {
        openTypeSelect.value = settings.openType;
        openTypeSelect.selected = true;
    }
    openTypeSelect.onchange = function(event) {
        settings.openType = event.target.value;
    }

    const mirrorSelect = document.querySelector('select[name="mirror"]');
    if (settings.mirror) {
        mirrorSelect.value = settings.mirror;
        mirrorSelect.selected = true;
    }
    mirrorSelect.onchange = function(event) {
        settings.mirror = event.target.value;
    }
}, false);