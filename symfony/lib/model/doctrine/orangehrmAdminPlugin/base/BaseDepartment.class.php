<?php

/**
 * BaseDepartment
 *
 * This class has been auto-generated by the Doctrine ORM Framework
 *
 * @property integer $id
 * @property string $name
 * @property Doctrine_Collection $Employee
 *
 * @method integer             getId()       Returns the current record's "id" value
 * @method string              getName()     Returns the current record's "name" value
 * @method Doctrine_Collection getEmployee() Returns the current record's "Employee" collection
 * @method Department         setId()       Sets the current record's "id" value
 * @method Department         setName()     Sets the current record's "name" value
 * @method Department         setEmployee() Sets the current record's "Employee" collection
 *
 * @package    orangehrm
 * @subpackage model\admin\base
 * @author     Your name here
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseDepartment extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('ohrm_department');
        $this->hasColumn('id', 'integer', null, array(
            'type' => 'integer',
            'primary' => true,
            'autoincrement' => true,
        ));
        $this->hasColumn('name', 'string', 50, array(
            'type' => 'string',
            'length' => 50,
        ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasMany('Employee', array(
            'local' => 'id',
            'foreign' => 'dep_code'));
    }
}