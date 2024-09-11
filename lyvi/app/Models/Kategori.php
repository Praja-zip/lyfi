<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kategori'
    ];

    public function products()
{
    return $this->belongsToMany(Master_product::class, 'product_kategoris', 'id_kategori', 'id_produk');
}

}
