(async ($) => {
    const phrasesDiv = $('.phrases');

    const phrases = await fetch('https://amazingphrases.herokuapp.com/phrase').then(res => res.json());
    phrasesDiv.html('');
    phrases.forEach(phrase => {
        phrasesDiv.append(
            $('<div>', {
                class: 'card my-4',
            }).append(
                $('<div>', {
                    class: 'card-body',
                }).append(
                    $('<i>', { html: phrase.value }),
                ),
                $('<div>', {
                    class: 'card-footer',
                }).append(
                    $('<i>', { html: phrase.author }),
                ),
            ),
        );
    });

})(window.jQuery);
