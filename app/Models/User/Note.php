<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Note extends Model
{
    use HasFactory;
    
    protected $table = 'user_notes';
    
    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
}
