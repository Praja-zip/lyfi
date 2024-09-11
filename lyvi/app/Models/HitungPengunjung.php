<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HitungPengunjung extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'is_bot',
        'visited_at',
    ];
}
