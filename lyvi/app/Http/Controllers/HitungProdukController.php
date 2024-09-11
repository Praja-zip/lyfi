<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use App\Models\Master_product;

class HitungProdukController extends Controller
{
    public function countProducts()
    {
        // Mengambil semua kategori unik dari tabel produk
        $kategoris = Kategori::select('nama_kategori')->distinct()->get();

        $category_count = [];
        $total_products = 0;

        foreach ($kategoris as $kategori) {
            $productCount = Kategori::where('nama_kategori', $kategori->nama_kategori)->count();
            $category_count[$kategori->nama_kategori] = $productCount;
            $total_products += $productCount;
        }

        $category_count['total_products'] = $total_products;

        return response()->json($category_count);
    }
}
