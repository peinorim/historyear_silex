<?php

/* * ****************************************************************** */
/* * ********************** INDEX ************************************* */
/* * ****************************************************************** */

$app->get('/{_locale}', function() use ($app) {
    
    $sql = "SELECT year FROM years ORDER BY asked DESC LIMIT 3";
    $top = $app['db']->fetchAll($sql);
    
    return $app['twig']->render('index.twig', array('year' => '','top'=> $top));
})->assert('_locale', 'fr|en')->value('_locale', 'en')->bind('homepage');

$app->get('/{_locale}/{year}', function($year) use ($app) {
    $sql = "SELECT year FROM years ORDER BY asked DESC LIMIT 3";
    $top = $app['db']->fetchAll($sql);
    
    return $app['twig']->render('index.twig', array('year' => '','top'=> $top));
})->assert('_locale', 'fr|en')->value('_locale', 'en')->bind('year');

$app->get('/year/{num}', function ($num) use ($app) {
    $sql = "SELECT asked FROM years WHERE year = ?";
    $asked = $app['db']->fetchAssoc($sql, array((int) $num));

    if ($asked['asked'] === null) {
        $sql = "INSERT INTO years (year,asked) VALUES (?,?)";
        $app['db']->executeUpdate($sql, array((int) $num,1));
    } else {
        $sql = "UPDATE years SET asked = asked + 1 WHERE year = ?";
        $app['db']->executeUpdate($sql, array((int) $num));
    }

    return "year: $num updated";
});
