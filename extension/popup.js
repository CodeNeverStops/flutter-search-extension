document.addEventListener('DOMContentLoaded', function() {
    const openTypeSelect = document.querySelector('select[name="open-type"]');
    if (settings.openType) {
        openTypeSelect.value = settings.openType;
        openTypeSelect.selected = true;
    }
    openTypeSelect.onchange = function(event) {
        settings.openType = event.target.value;
    }
}, false);