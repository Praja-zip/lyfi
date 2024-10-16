<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Master_product;
use App\Models\Produk_bundling;
use App\Models\Master_produk_bundling;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProdukBundlingController extends Controller
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

        // Mengambil data produk dengan pagination
        $produk_bundlings = Produk_bundling::paginate($perPage);

        // Mengembalikan respon JSON dengan data produk yang telah dipaginate
        return response()->json([
             'bundlings' => $produk_bundlings->map(function ($bundling) {
                // Decode JSON pada kolom array yang disimpan
                return [
                    'id' => $bundling->id,
                    'nama_bundle' => $bundling->nama_bundle,
                    'foto_bundle' => json_decode($bundling->foto_bundle), 
                    'harga_bundle' => $bundling->harga_bundle,
                    'detail_bundle' => $bundling->detail_bundle,
                    'redirect' => $bundling->redirect, 
                    'products' => $bundling->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'nama_produk' => $product->nama_produk,
                            // Tambahkan informasi produk lainnya jika perlu
                        ];
                    }),
                ];
            }),
            'current_page' => $produk_bundlings->currentPage(), // Halaman saat ini
            'last_page' => $produk_bundlings->lastPage(), // Halaman terakhir
            'total' => $produk_bundlings->total(), // Total item
            'per_page' => $produk_bundlings->perPage(), // Item per halaman
        ]);
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
        $validator = Validator::make($request->all(), [
            'nama_bundle' => 'required',
            'harga_bundle' => 'required',
            'detail_bundle' => 'required',
            'foto_bundle.*' => 'required|file',
            'pilih_produk' => 'required|array',
            'redirect' => 'required|array',
        ]);
    
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }
    
        $input = $request->all();
    
        if ($request->hasFile('foto_bundle')) {
            $uploadedImages = [];

            foreach ($request->file('foto_bundle') as $gambar) {
                $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
                Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar));
                $uploadedImages[] = 'storage/images/' . $nama_gambar;
            }
            $input['foto_bundle'] = json_encode($uploadedImages);
        }
    
        $input['redirect'] = $request->input('redirect');
        $produk_bundling = Produk_bundling::create($input);
    
        foreach ($request->input('pilih_produk') as $id_produk_master) {
            Master_produk_bundling::create([
                'id_produk_bundling' => $produk_bundling->id,
                'id_produk_master' => $id_produk_master
            ]);
        }
    
        return response()->json(['data' => $produk_bundling], 201);
    }
    


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Produk_bundling  $produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bundling = Produk_bundling::findOrFail($id);
        return response()->json([
            'success' => true,
            'bundling' => [
                'id' => $bundling->id,
                'nama_bundle' => $bundling->nama_bundle,
                'harga_bundle' => $bundling->harga_bundle,
                'redirect' => $bundling->redirect,
                'detail_bundle' => $bundling->detail_bundle,
                'foto_bundle' => json_decode($bundling->foto_bundle),
                'products' => $bundling->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'nama_produk' => $product->nama_produk,
                            'harga' => $product->harga_produk,
                            'foto_produk' => json_decode($product->foto_produk),
                            // Tambahkan informasi produk lainnya jika perlu
                        ];
                    }),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Produk_bundling  $produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function edit(Produk_bundling $produk_bundling)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Produk_bundling  $produk_bundling
     * @return \Illuminate\Http\Response
     */
    
     public function update(Request $request, $id) 
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'nama_bundle' => 'required',
        'harga_bundle' => 'required',
        'detail_bundle' => 'required',
        'foto_bundle' => 'nullable|array',
        'foto_bundle.*' => 'file|mimes:jpg,jpeg,png',
        'existing_foto_bundle' => 'nullable|array',
        'pilih_produk' => 'required|array',
        'redirect' => 'required|array',
    ]);

    if ($validator->fails()) {
        return response()->json(
            $validator->errors(),
            422
        );
    }

    // Cari produk bundling berdasarkan ID
    $produk_bundling = Produk_bundling::findOrFail($id);

    // Validasi setiap ID produk dalam 'pilih_produk'
    $produkIds = $request->input('pilih_produk');
    $validProdukIds = Master_product::whereIn('id', $produkIds)->pluck('id')->toArray();

    if (count($validProdukIds) !== count($produkIds)) {
        $invalidProdukIds = array_diff($produkIds, $validProdukIds);
        return response()->json([
            'error' => 'Beberapa produk ID tidak valid.',
            'invalid_ids' => $invalidProdukIds
        ], 422);
    }

    // Mengambil foto yang sudah ada dari produk bundling
    $currentFotoBundle = $produk_bundling->foto_bundle ? json_decode($produk_bundling->foto_bundle, true) : [];

    // Mengambil gambar yang dipertahankan (dari 'existing_foto_bundle')
    $existingFotoBundle = $request->input('existing_foto_bundle', []);

    // Hapus gambar yang tidak ada di 'existing_foto_bundle'
    $deletedImages = array_diff($currentFotoBundle, $existingFotoBundle);
    foreach ($deletedImages as $oldImage) {
        if (Storage::disk('public')->exists($oldImage)) {
            Storage::disk('public')->delete($oldImage);
        }
    }

    // Gambar yang akan disimpan adalah yang tetap ada + yang baru diunggah
    $updatedFotoBundle = $existingFotoBundle;

    // Jika ada gambar baru yang diunggah, tambahkan ke array foto
    if ($request->hasFile('foto_bundle')) {
        $uploadedImages = [];
        foreach ($request->file('foto_bundle') as $gambar) {
            $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
            Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar));
            $uploadedImages[] = 'storage/images/' . $nama_gambar;
        }

        // Gabungkan gambar baru dengan gambar yang ada
        $updatedFotoBundle = array_merge($updatedFotoBundle, $uploadedImages);
    }

    // Simpan array foto_bundle sebagai JSON
    $input = $request->all();
    $input['foto_bundle'] = json_encode($updatedFotoBundle);

   

    // Update produk bundling
    $produk_bundling->update($input);

    // Sinkronisasi produk yang dipilih ke dalam tabel pivot 'master_produk_bundlings'
    $produk_bundling->products()->sync($produkIds);

    return response()->json([
        'message' => 'success',
        'data' => $produk_bundling->load('products') // Mengambil produk bundling dengan daftar produk terkait
    ]);
}


    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Produk_bundling  $produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
{
    // Cari bundling berdasarkan ID
    $bundling = Produk_bundling::findOrFail($id);

    // Cek apakah ada foto bundling dan decode JSON
    if ($bundling->foto_bundle) {
        $fotoArray = json_decode($bundling->foto_bundle, true); // Decode JSON menjadi array

        // Menghapus file gambar yang terkait
        foreach ($fotoArray as $foto) {
            $filePath = public_path($foto); // Path lengkap gambar
            if (file_exists($filePath)) {
                unlink($filePath); // Hapus file gambar
            }
        }
    }
    Master_produk_bundling::where('id_produk_bundling', $bundling->id)->delete();


    // Hapus bundling dari database
    $bundling->delete();

    return response()->json([
        'success' => true,
        'message' => 'Bundling deleted successfully',
    ], 200);
}

}
