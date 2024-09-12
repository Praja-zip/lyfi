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
        Schema::table('produk_bundlings', function (Blueprint $table) {
            $table->dropColumn('pilih_produk');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('produk_bundlings', function (Blueprint $table) {
            $table->json('pilih_produk')->nullable(); // Menyimpan array produk
        });
    }
};
