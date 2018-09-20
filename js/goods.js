'use strict';


var GOODS_NAME = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка',
'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа',
'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро',
'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв',
'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var GOODS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель',
'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит','карбамид',
'вилларибо', 'виллабаджо'];

var GOODS_PICTURE = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-mustard.jpg',
'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg',
'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg',
'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg',
'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'marshmallow-beer.jpg',
'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg',
'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];

var goods = [];

var goodsInBasket = [];


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
  picture: GOODS_PICTURE[getRandomInt(0, GOODS_PICTURE.length - 1)],
  amount: getRandomInt (0, 21),
  price: getRandomInt (100, 1501),
  weight: getRandomInt (30, 301),
  rating {
    value: getRandomInt (1, 6),
    number: getRandomInt (10, 901)
  },
  nutritionFacts {
    sugar: getRandomBoolean(),
    energy: getRandomInt (70, 501),
    contents: getContents()
  }
};


var similarCardsElement = document.querySelector('.catalog__cards').remove('.catalog__cards--load');
similarCardsElement.querySelector('.catalog__load').classList.add('visually-hidden');

var cardTemplate = document.querySelector('#card');
var cardStatus = 'card--soon';
var cardRating = rating.value;


// Функция, возвращающая DOM-элемент для объекта с описанием товара
var renderGoods = function (good) {

  var cardElement = cardTemplate.cloneNode(true);

  if (1 <= good.amount && good.amount <= 5) {
    cardStatus = 'card--little';
  } else if (good.amount > 5) {
    cardStatus = 'card--in-stock';
  }
  cardElement.querySelector('.catalog__card').classList.add(cardStatus);
  cardElement.querySelector('.card__title').textContent = good['name'];
  cardElement.querySelector('.card__img').src = good['picture'];
  cardElement.querySelector('.card__price').textContent = good.price;
  cardElement.querySelector('.card__weight').textContent = good.weight;
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
  cardElement.querySelector('.stars__rating').classList.add(cardRating);
  cardElement.querySelector('.star__count').textContent = good.rating.number;
  good.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
  cardElement.querySelector('.card__characteristic').textContent = good.nutritionFacts.sugar, + ' ' + good.nutritionFacts.energy;
  cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

  return cardElement;
};

// Функция генерации и добавления случайных объектов с описанием товара в массив
var generateCards = function () {
 for (var i = 0; i < GOODS_NAME.length; i++); {
   goods.push(renderGoods());
 }
};

generateCards();

// Функция добавления в разметку массива сгенерированных обектов
var renderCards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderGoods(goods[i]));
  }
  similarCardsElement.appendChild(fragment);

  document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
  document.querySelector(.'goods__card-empty').classList.add('visually-hidden');
};

renderCards();



var cardInBasketTemplate = document.querySelector('#card-order');

// функция возврата случайного объекта, добавленного в корзину
var getGoodsInBusket = function () {
 return {
  name: GOODS_NAME[getRandomInt(0, GOODS_NAME.length - 1)],
  picture: GOODS_PICTURE[getRandomInt(0, GOODS_PICTURE.length - 1)],
  price: getRandomInt (100, 1501),
  weight: getRandomInt (30, 301),
};

// Функция, возвращающая DOM-элемент для объекта, добавленного в корзину
var renderGoodsInBasket = function (goodsInBasket) {
  var cardInBasketElement = cardInBasketTemplate.cloneNode(true);

  cardInBasketElement.querySelector(.'card-order__title').textContent = goodsInBasket['name'];
  cardElement.querySelector('.card-order__img').src = goodsInBasket['picture'];
  cardElement.querySelector('.card-order__price').textContent = goodsInBasket.price;

  return goodsInBasket;
};

// Функция генерации и добавления в массив случайных объектов в корзине
var generateCardsInBasket = function {
  for (var i = 0; i < 3; i++) {
    goodsInBasket.push(renderGoodsInBasket());
  }
};

generateCardsInBasket();

// Функция добавления в разметку массива сгенерированных обектов в корзине
var renderCardsInBasket = function () {
  var fragment = createDocumentFragment();
  for (var i = 0; i < 3; i++) {
    fragment.appendChild(renderGoodsInBasket(goodsInBasket[i]));
  }
  cardInBasketList.appendChild(fragment);
};

renderCardsInBasket();








