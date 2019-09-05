function ButtonLoader(buttonCurrent, iconLoading) {
    if (!iconLoading) {
        iconLoading = $('<i>', { class: 'fas fa-spinner fa-pulse' });
    }

    this.buttonCurrent = buttonCurrent;
    this.buttonOld = buttonCurrent.clone();
    this.iconLoading = iconLoading;

    this.hide = () => {
        buttonCurrent.removeAttr('disabled');
        buttonCurrent.replaceWith(this.buttonOld);
    };
    this.show = () => {
        buttonCurrent.attr('disabled', 'disabled');
        buttonCurrent.html(iconLoading);
    };
};
