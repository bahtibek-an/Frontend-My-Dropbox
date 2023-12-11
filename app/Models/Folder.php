<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';

    protected $fillable  = [ 
        'parent_id',
        'name',
        'user_id'
    ];

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function subfolders()
    {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    public function getAncestors()
    {
        $ancestors = collect([]);
        $currentFolder = $this;

        while ($currentFolder->parent_id) {
            $currentFolder = Folder::find($currentFolder->parent_id);
            $ancestors->push($currentFolder);
        }

        return $ancestors->reverse();
    }
}
