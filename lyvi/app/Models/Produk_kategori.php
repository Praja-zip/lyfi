<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk_kategori extends Model
{
    protected $table = 'produk_kategoris';

    public function product()
    {
        return $this->belongsTo(Master_product::class, 'id_produk');
    }
}
