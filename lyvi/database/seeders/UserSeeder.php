<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        User::create([
            'name' => 'admin',
            'email' => 'admin@google.com',
            'password' => Hash::make('admin123'), // Hash password
        ]);

        // Jika ingin menambah user lain, Anda bisa duplikat bagian ini:
    }
}
