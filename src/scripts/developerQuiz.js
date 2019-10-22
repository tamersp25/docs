const $ = require('jquery');
require('jquery-ui/ui/widgets/dialog');
require('jquery-ui/ui/widgets/progressbar');

function hideQuizContent() {
  $('.quiz-question, .quiz-choice').css('display', 'none');
}

function quizRedirect(url, imgSrc) {
  $('.persona-image').attr('src', imgSrc);
  $('.quickstart-link').attr('href', url);
  window.setTimeout(function() {
    if ($('.result').dialog('isOpen')) {
      window.location.href = url;
    }
  }, 2000);
}

$(window).on('load', function() {
  $('.quiz.main').dialog({
    classes: {
      'ui-dialog': 'quiz-container'
    },
    modal: true,
    width: 'auto',
    autoOpen: false,
    close: function() {
      hideQuizContent();
      $('.quiz-question.question-1').css('display', 'block');
      $('.quiz-choice.choice-1a').css('display', 'block');
      $('.quiz-choice.choice-1b').css('display', 'block');
    }
  });

  $('.result').dialog({
    classes: {
      'ui-dialog': 'quiz-container'
    },
    modal: true,
    width: 'auto',
    autoOpen: false,
    close: function() {
      $('.persona-text').attr('class', 'persona-text');
    }
  });

  $('.progress-bar').progressbar({ value: false });

  $('.start-quiz').on('click', function() {
    $('.quiz-question.question-1').css('display', 'block');
    $('.quiz-choice.choice-1a').css('display', 'block');
    $('.quiz-choice.choice-1b').css('display', 'block');
    $('.quiz').dialog('open');
  });

  $('.quiz-choice.choice-1a').on('click', function() {
    hideQuizContent();
    $('.quiz-question.question-2').css('display', 'block');
    $('.quiz-choice.choice-2a').css('display', 'block');
    $('.quiz-choice.choice-2b').css('display', 'block');
  });
  $('.quiz-choice.choice-1b').on('click', function() {
    $('.quiz').dialog('close');
    $('.result').dialog('open');
    $('.persona-text')
      .text('Engine Developer')
      .addClass('blue');
    quizRedirect(
      'https://docs.veritone.com/#/quickstart/engine-developer/',
      'docs/_media/personas/engine-developer.svg'
    );
  });

  $('.quiz-choice.choice-2a').on('click', function() {
    hideQuizContent();
    $('.quiz-question.question-3').css('display', 'block');
    $('.quiz-choice.choice-3a').css('display', 'block');
    $('.quiz-choice.choice-3b').css('display', 'block');
  });
  $('.quiz-choice.choice-2b').on('click', function() {
    $('.quiz').dialog('close');
    $('.result').dialog('open');
    $('.persona-text')
      .text('ML Integrator')
      .addClass('purple');
    quizRedirect(
      'https://docs.veritone.com/#/quickstart/ml-integrator/',
      'docs/_media/personas/ml-integrator.svg'
    );
  });

  $('.quiz-choice.choice-3a').on('click', function() {
    $('.quiz').dialog('close');
    $('.result').dialog('open');
    $('.persona-text')
      .text('ML Explorer')
      .addClass('teal');
    quizRedirect(
      'https://docs.veritone.com/#/quickstart/ml-explorer/',
      'docs/_media/personas/ml-explorer.svg'
    );
  });
  $('.quiz-choice.choice-3b').on('click', function() {
    $('.quiz').dialog('close');
    $('.result').dialog('open');
    $('.persona-text')
      .text('App Developer')
      .addClass('magenta');
    quizRedirect(
      'https://docs.veritone.com/#/quickstart/app-developer/',
      'docs/_media/personas/app-developer.svg'
    );
  });

  $('.retake-quiz').on('click', function() {
    $('.result').dialog('close');
    $('.quiz').dialog('open');
  });
});
