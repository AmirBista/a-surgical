<?php

    defined('PROJECT_NAME') or define('PROJECT_NAME','pbase');
    defined('DS') or define('DS', DIRECTORY_SEPARATOR);

    defined('APP_ROOT_FOLDER') or define('APP_ROOT_FOLDER', '');


    defined('FILE_BOX_FOLDER') or define('FILE_BOX_FOLDER', APP_ROOT_FOLDER.'filebox'.DS);
    defined('SRC_CSV_FOLDER') or define('SRC_CSV_FOLDER', FILE_BOX_FOLDER.'csv'.DS);

    defined('FROM_ENCODING') or define('FROM_ENCODING', 'SJIS-win, sjis, jis, EUC-JP, eucjp-win, utf-8,ascii,utf-8');

    defined('DATE') or define('DATE',date("Y-m-d")); /*used in making folder to save pdf according to date*/
    defined('SAVE_HTML_FOLDER') or define('SAVE_HTML_FOLDER', FILE_BOX_FOLDER.PROJECT_NAME.'_export'.DS.'html'.DS.DATE.DS);
    defined('SAVE_PDF_FOLDER') or define('SAVE_PDF_FOLDER', FILE_BOX_FOLDER.PROJECT_NAME.'_export'.DS.'pdf'.DS.DATE.DS);

    defined('HTML2PDF_JP_FONT_ENCODE') or define('HTML2PDF_JP_FONT_ENCODE', 'arialunicid0');
    defined('RPT_FOLDER') or define('RPT_FOLDER', 'rpt/');

    // Folder Location for Image 
    defined('SRC_IMG_FOLDER') or define('SRC_IMG_FOLDER', '..'.DS.'..'.DS.FILE_BOX_FOLDER.'image'.DS);
