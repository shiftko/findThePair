# Find the Pair

Игра в которой нужно находить одинаковые карты.
В начале игры выберете сетку (размер) поля и нажмите кнопку "Start".
Игру можно ставить на паузу нажатием на кнопку "Pause" и продолжить нажатием на "Continue" -
когда игра на паузе, счет времени останавливается и вы не можите открывать карты.
После удаления последней пары карт, будет показан результат текущей игры в таблице результатов
в виде последней записи.
В любой момент игры можно сбросить прогресс прохождения нажав на "Reset", в этом случае обнуляется счет времени
и сбрасывается(обновляется) поле с картами.

## Getting Started

Чтобы запустить игру "Find the Pair" скопируйте архив с игрой к себе в папку, разархивируйте.
Или через консоль используюя команду "git clone https://github.com/shiftko/findThePair.git".
Откройте "index.html".

### Prerequisites

Установка дополнительного ПО или библиотек не требуется.

## Running the tests

Для быстрой проверки работы программы скопируйте и выполните в консоли разработчика следующий код:

    var cards = document.getElementsByClassName('card');

    var imgs = [];
    var imgFiltered = [];
    for (var card of cards) {
        imgs.push(card.childNodes[0].getAttribute('src'));
    };
    var iteration = imgs.length / 2;
    for (var i = 0; i < iteration; i++) {
        imgFiltered.push(imgs[0]);
        imgs.splice(0, 1);
        for (var j = 0; j < imgs.length; j++) {
            if (imgFiltered[i] == imgs[j]) {
                imgs.splice(j, 1);
            }
        }
    }

    for (var i = 0; i < imgFiltered.length; i++) {
        cardSrc = imgFiltered[i];
        for (var j = 0; j < cards.length; j++) {
            if (cards[j].childNodes[0].getAttribute('src') == cardSrc) {
                cards[j].click();
                console.log('click');
            };
        };
    };

## Built With
- Javascript
- CSS 3
- MVC
- SOLID
- DRY
