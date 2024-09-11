<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        // Mengambil credentials (email dan password) dari request
        $credentials = $request->only('email', 'password');

        // Mencoba untuk login dengan credentials yang diberikan
        if (! $token = Auth::guard('admin')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Mendapatkan user yang sudah terautentikasi
        $user = Auth::guard('admin')->user();

        // Membuat custom claims untuk JWT
        $customClaims = [
            'email' => $user->email,
            'id' => $user->id,
            'role' => 'admin'
        ];

        // Menghasilkan token dengan custom claims
        $token = JWTAuth::claims($customClaims)->fromUser($user);

        // Mengembalikan token sebagai respon
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 120  // Waktu kadaluarsa dalam detik
        ]);
    }


    public function logout()
    {
        Auth::guard('admin')->logout();
        return response()->json(['message' => 'Logout successful'], 200);
    }
}
