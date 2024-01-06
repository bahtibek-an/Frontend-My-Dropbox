<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders_tables';

    protected $fillable  = [ 
        'base_id',
        'folder_name',
        'user_id'
    ];

    public function files()
    {
        return $this->hasMany(FileModel::class);
    }

    public function subfolders()
    {
        return $this->hasMany(Folder::class, 'base_id');
    }

    public function getAncestors()
    {
        $ancestors = collect([]);
        $currentFolder = $this;

        while ($currentFolder->base_id) {
            $currentFolder = Folder::findOrFail($currentFolder->base_id);
            $ancestors->push($currentFolder);
        }

        return $ancestors->reverse();
    }
}
