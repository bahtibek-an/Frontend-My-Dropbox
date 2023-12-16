<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileModel extends Model
{
    use HasFactory;

    protected $table = 'files';

    protected $fillable = [
        'folder_id',
        'file_name',
        'file_path',
        'user_id'
    ];

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
