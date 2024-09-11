<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('master_produk_bundlings', function (Blueprint $table) {
            $table->id(); // Ini akan secara otomatis menjadi unsignedBigInteger
            $table->unsignedBigInteger('id_produk_bundling');
            $table->unsignedBigInteger('id_produk_master'); // Ubah menjadi unsignedBigInteger
            $table->timestamps();

            // Add foreign key constraint
            $table->foreign('id_produk_master')->references('id')->on('master_products')->onDelete('cascade');
            $table->foreign('id_produk_bundling')->references('id')->on('produk_bundlings')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('master_produk_bundlings');
    }
};
