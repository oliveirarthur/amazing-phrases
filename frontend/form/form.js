const loader = new ButtonLoader(
    $('button[type=submit]'),
);

function publish(e) {
    e.preventDefault();
    loader.show();

    const body = $('form').serializeArray().reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
    });

    console.log('Salvando...', JSON.stringify(body, null, 4));

    return fetch('https://amazingphrases.herokuapp.com/phrase', {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then(res => res.json())
    .then(res => {
        alert(`Phrase #${res.id} criada com sucesso!`);
        loader.hide()
        location.reload();
    })
    .catch(err => {
        alert('Ocorreu um erro ao cadastrar a phrase =/' + JSON.stringify(err, null, 4));
        loader.hide()
    });
}
