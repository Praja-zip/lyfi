<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function login(Request $request)
    {
        // Ambil kredensial dari request
        $credentials = $request->only('email', 'password');
    
        // Mencoba login menggunakan guard 'admin'
        if (! $token = Auth::guard('admin')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Mendapatkan user yang sudah login
        $user = Auth::guard('admin')->user();
    
        // Mengembalikan token JWT
        return $this->respondWithToken($token, $user);
    }
    

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
            'expires_in' => JWTAuth::factory()->getTTL() * 120  // Waktu kadaluarsa dalam detik
        ]);
    }


    public function logout()
    {
        Auth::guard('admin')->logout(); // Menggunakan guard 'admin'
        return response()->json(['message' => 'Logout successful'], 200);
    }
    
}
