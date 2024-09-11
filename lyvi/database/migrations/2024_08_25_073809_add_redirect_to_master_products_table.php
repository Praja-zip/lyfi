<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRedirectToMasterProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('master_products', function (Blueprint $table) {
            $table->json('redirect')->nullable(); // Menambahkan kolom redirect dengan tipe data JSON
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('master_products', function (Blueprint $table) {
            $table->dropColumn('redirect'); // Menghapus kolom redirect
        });
    }
}
