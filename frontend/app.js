(async ($) => {
    const phrasesDiv = $('.phrases');

    const phrases = await fetch('https://amazingphrases.herokuapp.com/phrase').then(res => res.json());
    phrasesDiv.html('');
    phrases.forEach(phrase => {
        const dateCreated = new Date(phrase.date);
        phrasesDiv.append(
            $('<div>', {
                class: 'card my-4',
            }).append(
                $('<div>', {
                    class: 'card-body',
                }).append(
                    $('<span>', { html: phrase.value }),
                ),
                $('<div>', {
                    class: 'card-footer',
                }).append(
                    $('<i>', { html: phrase.author }),
                    $('<span>', { html: ' @ ' + dateCreated.toLocaleString() }),
                ),
            ),
        );
    });

})(window.jQuery);
