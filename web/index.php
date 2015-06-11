<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\Translation\Loader\YamlFileLoader;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$app['debug'] = true;

/* * ********************************************************** */
/* * ********************** VIEWS ***************************** */
/* * ********************************************************** */

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../views',
));

/* * *********************************************************** */
/* * ******************** TRANSLATOR *************************** */
/* * *********************************************************** */

$app->register(new Silex\Provider\TranslationServiceProvider(), array(
    'locale_fallback' => 'en',
    'translation.class_path' => __DIR__ . '/vendor/Symfony/Component',
));

$app['translator'] = $app->share($app->extend('translator', function($translator, $app) {
            $translator->addLoader('yaml', new YamlFileLoader());
            $translator->addResource('yaml', __DIR__ . '/../locales/en.yml', 'en');
            $translator->addResource('yaml', __DIR__ . '/../locales/fr.yml', 'fr');
            return $translator;
        }));

/* * *********************************************************** */
/* * ************************ BDD ****************************** */
/* * *********************************************************** */
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'dbs.options' => array (
        'mysql' => array(
            'driver'    => 'pdo_mysql',
            'host'      => 'localhost',
            'dbname'    => 'historyear',
            'user'      => '',
            'password'  => '',
            'charset'   => 'utf8mb4',
        )
    ),
));
/* * ************************************************************* */
/* * ********************** ROUTES ******************************* */
/* * ************************************************************* */

require "routes.php";

/* * ************************************************************* */
/* * *********************** ERROR ******************************* */
/* * ************************************************************* */

$app->error(function (\Exception $e, $code) use ($app) {

    if ($app['debug']) {
        return;
    }

    switch ($code) {
        case 404:
            $message = $app['twig']->render('404.twig', array('code' => $code));
            break;
        case 500:
            $message = $app['twig']->render('500.twig', array('code' => $code));
            break;
        default:
            $message = 'We are sorry, but something went terribly wrong.';
    }
    return new Response($message, $code);
});

/* * *************************************************************** */
/* * *********************** RUN *********************************** */
/* * *************************************************************** */

$app->run();
