<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';

    protected $fillable = [
        'folder_id',
        'name',
        'path',
        'user_id'
    ];


    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
