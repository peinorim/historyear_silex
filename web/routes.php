<?php

/* * ****************************************************************** */
/* * ********************** INDEX ************************************* */
/* * ****************************************************************** */

$app->get('/{_locale}', function() use ($app) {
    return $app['twig']->render('index.twig');
})->assert('_locale', 'fr|en')->value('_locale', 'en')->bind('homepage');

$app->get('/{_locale}/{year}', function($year) use ($app) {
    return $app['twig']->render('index.twig', array('year'=> $year));
})->assert('_locale', 'fr|en')->value('_locale', 'en')->bind('year');
