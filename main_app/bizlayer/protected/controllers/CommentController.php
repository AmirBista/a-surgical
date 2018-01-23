<?php
class CommentController extends PrivateController {
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 1;
        $this->_controller_name = 'comment';
        $this->_model_name ='Comment';
        $this->_table_name = 'yig_comment';
        $this->_pk_col = 'comment_id';
        $this->_keyword_searchable_fields = null;
    }
}
?>