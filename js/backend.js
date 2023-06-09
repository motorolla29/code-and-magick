'use strict';

(function() {
    window.backend = {
        load: function(onLoad, onError) {
    
            var URL = 'https://24.javascript.pages.academy/code-and-magick/data';
    
            var xhr = new XMLHttpRequest();
    
            xhr.responseType = 'json';
    
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                  onLoad(xhr.response);
                } else {
                  onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });
    
            xhr.addEventListener('error', function () {
              onError('Произошла ошибка соединения');
            });
            
            xhr.addEventListener('timeout', function () {
              onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });
            
            xhr.timeout = 10000; // 10s
            
            xhr.open('GET', URL);
            xhr.send();
        },
    
        save: function(data, onLoad, onError) {
    
            var URL = 'https://24.javascript.pages.academy/code-and-magick';
    
            var xhr = new XMLHttpRequest();

            xhr.responseType = 'json';

            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                  onLoad();
                } else {
                  onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });
    
            xhr.addEventListener('error', function () {
              onError('Произошла ошибка соединения');
            });
            
            xhr.addEventListener('timeout', function () {
              onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });
            
            xhr.open('POST', URL);
            xhr.send(data);
        }
    };
}());




