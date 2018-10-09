'use strict';


var GOODS_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var GOODS_CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var GOODS_PICTURES = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'
];

var goods = [];
var goodsInBasket = [];
var cardTemplate = document.querySelector('#card');
var cardStatus = 'card--soon';
var similarCardsElement = document.querySelector('.catalog__cards');
var cardInBasketTemplate = document.querySelector('#card-order');
var sendFormBtn = document.querySelector('.buy__submit-btn');


var getRandomInt = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};


var getRandomBoolean = function () {
  Boolean(Math.round(Math.random()));
};


var getContents = function () {
  var contentsArray = [];
  for (var i = 0; i < getRandomInt(1, 5); i++) {
    var contents = GOODS_CONTENTS[getRandomInt(0, GOODS_CONTENTS.length - 1)];
    contentsArray.push(contents);
  }
  return contentsArray.join(',');
};


// функция возврата случайного объекта с описанием товара
var getGoods = function () {
  return {
    name: GOODS_NAMES[getRandomInt(0, GOODS_NAMES.length - 1)],
    picture: GOODS_PICTURES[getRandomInt(0, GOODS_PICTURES.length - 1)],
    amount: getRandomInt(0, 21),
    price: getRandomInt(100, 1501),
    weight: getRandomInt(30, 301),
    rating: {
      value: getRandomInt(1, 5),
      number: getRandomInt(10, 901)
    },
    nutritionFacts: {
      sugar: getRandomBoolean(),
      energy: getRandomInt(70, 501),
      contents: getContents()
    }
  };
};

// Функция, возвращающая DOM-элемент для объекта с описанием товара
var renderGoods = function (good) {
  var cardRating = '';
  var cardElement = cardTemplate.cloneNode(true).content;
  var sugar = good.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';

  if (good.amount >= 1 && good.amount <= 5) {
    cardStatus = 'card--little';
  } else if (good.amount > 5) {
    cardStatus = 'card--in-stock';
  }
  cardElement.querySelector('.catalog__card').classList.add(cardStatus);
  cardElement.querySelector('.card__title').textContent = good['name'];
  cardElement.querySelector('.card__img').src = good['picture'];
  cardElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';
  switch (good.rating.value) {
    case 1:
      cardRating = 'stars__rating--one';
      break;
    case 2:
      cardRating = 'stars__rating--two';
      break;
    case 3:
      cardRating = 'stars__rating--three';
      break;
    case 4:
      cardRating = 'stars__rating--four';
      break;
    case 5:
      cardRating = 'stars__rating--five';
  }

  // var ValueToClass = {
  //   '1': 'stars__rating--one',
  //   '2': 'stars__rating--two',
  //   '3': 'stars__rating--three',
  //   '4': 'stars__rating--four',
  //   '5': 'stars__rating--four'
  // };
  // var cardRating = cardElement.querySelector('.stars__rating');
  // ValueToClass[good.rating.value];
  // cardRating.classList.add([good.rating.value]);
  cardElement.querySelector('.stars__rating').classList.add(cardRating);
  cardElement.querySelector('.star__count').textContent = good.rating.number;
  cardElement.querySelector('.card__characteristic').textContent = sugar + ' ' + good.nutritionFacts.energy;
  cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

  var favoriteSelected = cardElement.querySelector('.card__btn-favorite');
  favoriteSelected.addEventListener('click', function (evt) {
    evt.preventDefault();
    favoriteSelected.classList.toggle('card__btn-favorite--selected');
  });
  var pressBtnToBasket = cardElement.querySelector('.card__btn');
  pressBtnToBasket.addEventListener('click', function (evt) {
    evt.preventDefault();
    addToBasket();
  });
  return cardElement;
};


// функция возврата случайного объекта, добавленного в корзину
var getGoodsInBasket = function () {
  return {
    name: GOODS_NAMES[getRandomInt(0, GOODS_NAMES.length - 1)],
    picture: GOODS_PICTURES[getRandomInt(0, GOODS_PICTURES.length - 1)],
    price: getRandomInt(100, 1501),
    weight: getRandomInt(30, 301),
  };
};


// Функция, возвращающая DOM-элемент для объекта, добавленного в корзину
var renderGoodsInBasket = function (goodsItemInBasket) {
  var cardElement = cardInBasketTemplate.cloneNode(true).content;
  cardElement.querySelector('.card-order__title').textContent = goodsItemInBasket['name'];
  cardElement.querySelector('.card-order__img').src = goodsItemInBasket['picture'];
  cardElement.querySelector('.card-order__price').textContent = goodsItemInBasket.price;
  return cardElement;
};


// Функция генерации и добавления случайных объектов с описанием товара в массив
var generateCards = function () {
  for (var i = 0; i < 26; i++) {
    goods.push(getGoods());
  }
};


// Функция добавления в разметку массива сгенерированных обектов
var renderCards = function () {
  var fragment = document.createDocumentFragment();
  goods.forEach(function (element) {
    fragment.appendChild(renderGoods(element));
  });
  similarCardsElement.appendChild(fragment);
  similarCardsElement.classList.remove('visually-hidden');
};


// Функция генерации и добавления в массив случайных объектов в корзине
var generateCardsInBasket = function () {
  for (var i = 0; i < 3; i++) {
    goodsInBasket.push(getGoodsInBasket());
  }
};


// Функция добавления в разметку массива сгенерированных обектов в корзине
var renderCardsInBasket = function () {
  var fragment = document.createDocumentFragment();
  var cardInBasketList = document.querySelector('.goods__cards');
  goodsInBasket.forEach(function (element) {

    fragment.appendChild(renderGoodsInBasket(element));
  });
  cardInBasketList.appendChild(fragment);
  cardInBasketList.classList.remove('goods__cards--empty');
  document.querySelector('.goods__card-empty').classList.add('visually-hidden');
  // renderHeaderBusket();
};


generateCards();
renderCards();
generateCardsInBasket();
renderCardsInBasket();


var catalogLoadElem = similarCardsElement.querySelector('.catalog__load');
catalogLoadElem.classList.add('visually-hidden');


var addToBasket = function (product) {
  var goodInBasket = Object.assign({}, product);
  goodInBasket.orderedAmount = 1;
  if (goodInBasket.amount <= goodInBasket.orderedamount) {
    return;
  }
  delete goodInBasket.amount;
  if (goodsInBasket.find(goodInBasket.name) === product.name) {
    goodInBasket.orderedamount++;
  } else {
    goodsInBasket.push(goodInBasket);
  }
};

// var initialValue = 0;
// var calculateSum = function (accumulator, currentValue) {
//   return accumulator + currentValue.price;
// };


// var renderHeaderBusket = function () {
//   var generalSum = goodsInBasket.reduce(calculateSum(), initialValue);
//   document.querySelector('.main-header__basket').textContent = 'В корзине ' + goodsInBasket.length + ' товара на ' + generalSum + '₽';
// };


// var deliverStoreBtn = document.querySelector('#deliver__store');
// var deliverCourierBtn = document.querySelector('#deliver__courier');
// var deliverStoreOptions = document.querySelector('.deliver__store');
// var deliverCourierOptions = document.querySelector('.deliver__courier');
// deliverStoreBtn.addEventListener('click', function () {
//   deliverCourierOptions.classList.add('visually-hidden');
//   deliverStoreOptions.classList.remove('visually-hidden');
// });
// var deliverTab = document.querySelectorAll('.toggle-btn__input');
// var deliverStoreOptions = document.querySelector('.deliver__store');
// var deliverCourierOptions = document.querySelector('.deliver__courier');
// deliverTab.addEventListener('click', function (evt) {
//   if (evt.target.id === '#deliver__store') {
//     deliverCourierOptions.classList.add('visually-hidden');
//     deliverStoreOptions.classList.remove('visually-hidden');
//   } else if (evt.target.id === '#deliver__courier') {
//     deliverStoreOptions.classList.add('visually-hidden');
//     deliverCourierOptions.classList.remove('visually-hidden');
//   }
// });

var cardNumberArea = document.querySelector('#payment__card-number').classList.contains;
var validateCardArea = function (cardNumber) {
  cardNumber = cardNumberArea.textContent;
  var cardNumberArr = [];
  var cardNumberList = cardNumber.split('');
  for (var i = 1; i <= cardNumberList.length; i++) {
    if (i % 2 !== 0) {
      var cardOddNum = parseInt(cardNumber[i], 10) * 2;
      if (cardOddNum > 9) {
        cardNumberArr.push(cardOddNum - 9);
      } else {
        cardNumberArr.push(cardOddNum);
      }
    } else {
      var cardEvenNum = parseInt(cardNumber[i], 10);
      cardNumberArr.push(cardEvenNum);
    }
  }
  var commonSum = cardNumberArr.reduce(function (a, b) {
    return a + b;
  });

  if (commonSum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

sendFormBtn.addEventListener('click', function () {
  if (validateCardArea()) {
    return sendFormBtn.setCustomValidity('');
  } else {
    return sendFormBtn.setCustomValidity('Номер карты введен некорректно. Попробуйте еще раз');
  }
});

var rangeFilterElem = document.querySelector('.range__filter');
var rangeFilterPos = rangeFilterElem.getBoundingClientRect();
var getPercentage = function (number) {
  return Math.min(Math.max(0, Math.round(number * 100 / rangeFilterPos.width)), 100);
};

var leftPinElem = rangeFilterElem.querySelector('.range__btn--left');
var rightPinElem = rangeFilterElem.querySelector('.range__btn--right');
var leftPinPrice = document.querySelector('.range__price--min');
var rightPinPrice = document.querySelector('.range__price--max');
var colorPinStr = rangeFilterElem.querySelector('.range__fill-line');
var pinValues = {
  min: getPercentage(leftPinElem.getBoundingClientRect().x - rangeFilterPos.x),
  max: getPercentage(rightPinElem.getBoundingClientRect().x - rangeFilterPos.x)
};

var getPriceValue = function () {
  rightPinPrice.textContent = Math.round(pinValues.max * rangeFilterPos.width / 100);
  leftPinPrice.textContent = Math.round(pinValues.min * rangeFilterPos.width / 100);
};

var onMouseDown = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();

  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();

    if (evt.target.classList.contains('range__btn--left')) {
      var leftPercentPos = Math.min(getPercentage(evtMove.clientX - rangeFilterPos.x), pinValues.max);
      pinValues.min = leftPercentPos;
      leftPinElem.style.left = leftPercentPos + '%';
      colorPinStr.style.left = leftPercentPos + '%';
      getPriceValue();
    } else if (evt.target.classList.contains('range__btn--right')) {
      var rightPercentPos = Math.max(getPercentage(evtMove.clientX - rangeFilterPos.x), pinValues.min);
      pinValues.max = rightPercentPos;
      rightPinElem.style.left = rightPercentPos + '%';
      colorPinStr.style.right = 100 - rightPercentPos + '%';
      getPriceValue();
    }
  };
  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

leftPinElem.addEventListener('mousedown', onMouseDown);
rightPinElem.addEventListener('mousedown', onMouseDown);
