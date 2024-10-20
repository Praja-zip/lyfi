<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Master_product extends Model
{
    use HasFactory;

    protected $casts = [
        'redirect' => 'array',
    ];
    protected $fillable = [
        'nama_produk',
        'harga_produk',
        'detail_produk',
        'foto_produk',
        'bahan_produk',
        'cara_pemakaian',
        'redirect' // jika kolom redirect ada
    ];
    protected $table = 'master_products';

    public function bundlings()
    {
        return $this->hasMany(Master_produk_bundling::class, 'id_produk_master');
    }

    public function kategoris()
    {
        return $this->belongsToMany(Kategori::class, 'produk_kategoris', 'id_produk', 'id_kategori');
    }

    protected static function boot()
    {
        parent::boot();

        // Event deleting untuk menghapus data pada pivot table
        static::deleting(function ($masterProduct) {
            // Hapus semua relasi produk dengan kategori di tabel pivot 'produk_kategoris'
            $masterProduct->kategoris()->detach();
        });
    }

    public function produkBundlings()
    {
        return $this->belongsToMany(Produk_bundling::class, 'master_produk_bundlings', 'id_produk_master', 'id_produk_bundling');
    }
    
    
    
}