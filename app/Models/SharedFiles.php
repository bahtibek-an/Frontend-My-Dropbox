<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SharedFiles extends Model
{
    use HasFactory;
   protected $fillable = ['file_id','file_url','file_encrypted'] ;
}
