<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use App\Models\Master_product;

class Produk_bundling extends Model
{
    use HasFactory;

    protected $fillable = [
            'nama_bundle',
            'harga_bundle',
            'detail_bundle',
            'foto_bundle',
            'redirect'
    ];
    protected $table = 'produk_bundlings';

    protected $casts = [
        'redirect' => 'array'
    ];

    public function masterBundling()
    {
        return $this->hasMany(Master_produk_bundling::class, 'id_produk_bundling');
    }

    public function products()
    {
        return $this->belongsToMany(Master_product::class, 'master_produk_bundlings', 'id_produk_bundling', 'id_produk_master');
    }
    

    
}
