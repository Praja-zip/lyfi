<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Master_product;
use App\Models\Master_produk_bundling;
use App\Models\Produk_bundling;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class MasterProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('admin.auth')->only(['store', 'update', 'destroy']);
    }
    public function index(Request $request)
{
    // Menentukan jumlah item per halaman, defaultnya 10 jika tidak ada parameter 'per_page'
    $perPage = $request->get('per_page', 10);

    // Mengambil data produk dengan relasi kategori yang terhubung, menggunakan eager loading
    $master_products = Master_product::with('kategoris')->paginate($perPage);
    
    // Mengembalikan respon JSON dengan data produk beserta kategori yang terkait
    return response()->json([
        'data' => $master_products->map(function ($product) {
            return [
                'id' => $product->id,
                'nama_produk' => $product->nama_produk,
                'harga_produk' => $product->harga_produk,
                'foto_produk' => json_decode($product->foto_produk),
                'detail_produk' => $product->detail_produk,
                'kategori' => $product->kategoris->map(function ($kategori) {
                    return $kategori->nama_kategori;
                }),
            ];
        }),
        'current_page' => $master_products->currentPage(),
        'last_page' => $master_products->lastPage(),
        'total' => $master_products->total(),
        'per_page' => $master_products->perPage(),
    ]);
}

public function count(){
    $produk = Master_product::count();
    $bundling = Produk_bundling::count();

    return response()->json([
        
        'total_produk' => $produk,   
        'total_bundling' => $bundling, 
    ]);
}

public function chartdata(){
    $categories = DB::table('produk_kategoris')
    ->join('kategoris', 'produk_kategoris.id_kategori', '=', 'kategoris.id')
    ->select('kategoris.nama_kategori', DB::raw('count(produk_kategoris.id_produk) as total_produk'))
    ->groupBy('kategoris.nama_kategori')
    ->get();

    return response()->json([
        'categories' => $categories,
    ]);
}



public function update(Request $request, $id)
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'nama_produk' => 'required|string|max:255',
        'harga_produk' => 'required|numeric',
        'detail_produk' => 'required|string',
        'foto_produk.*' => 'nullable|file', // Mendukung array file
        'bahan_produk' => 'required|string',
        'cara_pemakaian' => 'required|string',
        'kategori' => 'required|exists:kategoris,id', // Pastikan kategori valid
        'redirect' => 'required|url',
        'existing_foto_produk' => 'nullable|array',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Cari produk berdasarkan ID
    $master_product = Master_product::findOrFail($id);

    // Ambil foto produk yang sudah ada
    $currentFotoProduk = $master_product->foto_produk ? json_decode($master_product->foto_produk, true) : [];
    
    // Foto produk yang masih dipertahankan (dari existing_foto_produk)
    $existingFotoProduk = $request->input('existing_foto_produk', []);
    
    // Hapus foto yang dihapus oleh user
    $deletedImages = array_diff($currentFotoProduk, $existingFotoProduk);
    foreach ($deletedImages as $oldImage) {
        if (Storage::disk('public')->exists($oldImage)) {
            Storage::disk('public')->delete($oldImage);
        }
    }

    // Update foto produk
    $updatedFotoProduk = $existingFotoProduk;

    // Jika ada gambar baru yang diupload, proses dan tambahkan ke array
    if ($request->hasFile('foto_produk')) {
        $uploadedImages = [];
        foreach ($request->file('foto_produk') as $gambar) {
            $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
            Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar)); 
            $uploadedImages[] = 'storage/images/' . $nama_gambar; // Simpan path gambar yang baru
        }

        // Gabungkan gambar baru dengan gambar yang ada
        $updatedFotoProduk = array_merge($updatedFotoProduk, $uploadedImages);
    }

    // Simpan array foto_produk sebagai JSON
    $master_product->foto_produk = json_encode($updatedFotoProduk);

    // Ambil semua input kecuali kategori dan foto_produk
    $input = $request->except('kategori', 'foto_produk');

    // Update data produk lainnya
    $master_product->update($input);

    // Sinkronisasi kategori (jika relasinya belongsToMany)
    $master_product->kategoris()->sync([$request->input('kategori')]);

    // Response jika berhasil
    return response()->json([
        'message' => 'Product updated successfully!',
        'data' => $master_product->load('kategoris')
    ], 200);
}



// public function update(Request $request, $id)
// {
//     dd($request->all());  // Periksa data yang diterima backend
// }


public function show($id)
{
    try {
        $product = Master_product::findOrFail($id); // Menggunakan findOrFail untuk menangani ID yang tidak ditemukan
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $product->id,
                'nama_produk' => $product->nama_produk,
                'harga_produk' => $product->harga_produk,
                'bahan_produk' => $product->bahan_produk,
                'redirect' => $product->redirect,
                'cara_pemakaian' => $product->cara_pemakaian,
                'foto_produk' => json_decode($product->foto_produk), // Decode jika formatnya JSON
                'detail_produk' => $product->detail_produk,
                'kategori' => $product->kategoris->map(function ($kategori) {
                    return [
                        'id' => $kategori->id,
                        'nama_kategori' => $kategori->nama_kategori,
                    ];
                }), // Mengambil nama kategori
            ]
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Product not found',
        ], 404);
    }
}



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'nama_produk' => 'required|string|max:255',
        'harga_produk' => 'required|numeric',
        'detail_produk' => 'required|string',
        'foto_produk.*' => 'nullable|file',
        'bahan_produk' => 'required|string',
        'cara_pemakaian' => 'required|string',
        'kategori' => 'required|exists:kategoris,id',
        'redirect' => 'required|url'
    ]);

    // Jika validasi gagal, kembalikan error
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Ekstrak semua input kecuali 'kategori' dan 'foto_produk'
    $input = $request->except('kategori', 'foto_produk');

    // Proses file gambar jika ada
    if ($request->hasFile('foto_produk')) {
        // Simpan gambar baru
        $uploadedImages = [];
        foreach ($request->file('foto_produk') as $gambar) {
            $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
            Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar));
            $uploadedImages[] = 'storage/images/' . $nama_gambar;
        }

        // Simpan nama file gambar baru sebagai array
        $input['foto_produk'] = json_encode($uploadedImages);
    }

    // Buat entri produk baru
    $master_product = Master_product::create($input);

    // Lampirkan kategori ke produk menggunakan tabel pivot
    $master_product->kategoris()->attach($request->input('kategori'));

    // Kembalikan respon sukses dengan data produk beserta kategori yang terhubung
    return response()->json([
        'data' => $master_product->load('kategoris') // Muat relasi kategori
    ], 201);
}

public function destroy($id)
{
    try {
        // Cari produk berdasarkan id
        $product = Master_product::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        // Periksa apakah produk ini digunakan dalam tabel master_produk_bundlings
        $isBundled = Master_produk_bundling::where('id_produk_master', $id)->exists();

        if ($isBundled) {
            return response()->json([
                'message' => 'Tidak bisa mengahapus product, karena bagian dari bundling'
            ], 400); // 400 Bad Request, karena logika ini merupakan client error
        }

        // Hapus foto produk dari storage jika ada
        $photos = json_decode($product->foto_produk);
        if (!empty($photos)) {
            foreach ($photos as $foto) {
                // Menghapus file dari storage
                if (Storage::exists($foto)) {
                    Storage::delete($foto);
                }
            }
        }

        // Hapus produk
        $product->delete();

        // Kembalikan respon sukses
        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);

    } catch (\Exception $e) {
        // Tangani kesalahan
        return response()->json([
            'message' => 'Error deleting product',
            'error' => $e->getMessage()
        ], 500);
    }
}


}