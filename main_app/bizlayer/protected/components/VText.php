<?php
/**
 * Utility class for translating text with variables
 * Works similar to Yii::t
 * Use as VText::t
 */
Class VText {

    public static function t($textWithVariable, $params=array())
    {
        if($params===array())
        {
            return $textWithVariable;
        }
        if(!is_array($params))
        {
            $params=array($params);
        }
        if(isset($params[0])) // number choice
        {
            if(strpos($textWithVariable, '|')!==false)
            {
                if(strpos($textWithVariable, '#')===false)
                {
                    $chunks=explode('|', $textWithVariable);
                    $expressions=array(); // changed pb@mi 2012-11-22
                    if($n=min(count($chunks), count($expressions)))
                    {
                        for($i=0;$i<$n;$i++)
                        {
                            $chunks[$i]=$expressions[$i].'#'.$chunks[$i];
                        }
                        $textWithVariable=implode('|', $chunks);
                    }
                }
                $textWithVariable=VText::format($textWithVariable, $params[0]);
            }
            if(!isset($params['{n}']))
            {
                $params['{n}']=$params[0];
            }
            unset($params[0]);
        }

        return $params!==array() ? strtr($textWithVariable,$params) : $textWithVariable;
    }

    public static function format($texts, $number)
    {
        $n=preg_match_all('/\s*([^#]*)\s*#([^\|]*)\|/',$texts.'|', $matches);
        if($n===0)
        {
            return $texts;
        }
        for($i=0;$i<$n;++$i)
        {
            $expression=$matches[1][$i];
            $message=$matches[2][$i];
            if($expression===(string)(int)$expression)
            {
                if($expression==$number)
                {
                    return $message;
                }
            }
            else if(VText::evaluate(str_replace('n', '$n', $expression), $number))
            {
                 return $message;
            }
        }
        return $message; // return the last choice
    }

    public static function evaluate($expression, $n)
    {
        return @eval("return $expression;");
    }
}
