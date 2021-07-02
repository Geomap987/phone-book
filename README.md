# СУПЕРБАЗА

## <http://lumpyspace.ml>

**Описание**

Данное приложение создано для отображения базы данных звонков клиентам в виде таблицы. На главной странице приложение пользователь может произвести поиск по конкретному номеру телефона или ID оператора. Для столбца "Дата и время звонка" доступна сортировка по возрастанию и убыванию.
При клике на номер телефона пользователь переходит на страницу с данными по звонкам на данный номер телефона.
Также разработан раздел "Статистика количества звонков", где пользователь может увидеть данные о количестве совершенных звонков по одной из следующих опций: номер телефона; дата; ожидание ответа в секундах (отображается 10 интервалов); продолжительность разговора в секундах (отображается 10 интервалов), ID оператора.

**Основные технологии**
* Проект реализован на React с использованием функциональных компонентов React, хуков useState, useEffect;
* Данные запрашиваются с сервера при помощи метода fetch();
* Для удобного использовния приложения на разных разрешениях выполнен отзывчивая верстка;