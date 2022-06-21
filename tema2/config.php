<?php 

$tpl_config['template_name'] = "default-neo";
$tpl_config['rec_per_page'] = 20;
$tpl_config['responsive'] = 1;
$tpl_config['wrt_list_main'] = 1;
$tpl_config['pub_list_main'] = 1;
$tpl_config['combine_css'] = 0;
$tpl_config['combine_js'] = 1;

$tpl_config['external_css'] .= '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">';

$tpl_config["css"]=array(
	'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
	SITE_PATH.'js/fancybox/jquery.fancybox.css?v='.$config["cache_rev"],
  SITE_PATH.TEMPLATE_PATH.'css/main.css?v='.$config["cache_rev"],
  SITE_PATH.TEMPLATE_PATH.'css/color.'.$config["cfg_template_color"].'.css?v='.$config["cache_rev"],
	HTTP_MEMBER_IMAGES.'custom_user_'.$tpl_config['template_name'].'.css?v='.$config["cache_rev"],
);
$tpl_config["js"]=array(
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
  SITE_PATH.'js/fancybox/jquery.fancybox.pack.js?v='.$config["cache_rev"],
  SITE_PATH.TEMPLATE_PATH.'js/js.js?v='.$config["cache_rev"],
);

class template_options_default_neo {
	function install(){
		global $con;
		require_once(DIR_CLASSES."MenuTypes.php");
		$mnt = new MenuTypes();
		$menu_list = array("main"=>"Ana Menü", "top"=>"Üst Menü", "social"=>"Sosyal Medya", "footer_social"=>"Sosyal Medya Footer", "footer_top"=>"Footer Menü");
		foreach($menu_list as $type=>$label){
			$mnt->addMenuByType($type,$label);	
		}
	}
	
	function getColorOptions(){
		return array('default' => '#FF3D00', 'pink' => '#e91e63', 'purple' => '#7b1fa2', 'blue' => '#1976d2', 'red' => '#d50000', 'black' => '#000');
	}
}

?>