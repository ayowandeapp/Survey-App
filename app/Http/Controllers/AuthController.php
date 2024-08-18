<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required', 'confirmed', //Password::min(8)->mixedCase()->numbers()->symbols()
                ]
            ]);
        /** @var App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(['user' => $user , 'token' =>$token]);


    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required'
                ],
            'remember' => 'boolean'
            ]);
        //get the remember value if exist, else set it to false
        $remember = $data['remember'] ?? false;
        unset($data['remember']); //destroy the variable

        if(!Auth::attempt($data, $remember)) {
            return response()->json([
                'error' => 'The provided credentials are not correct'], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(['user' => $user , 'token' =>$token]);
    }
    public function logout()
    {
        /** @var App\Models\User $user */
        $user = Auth::user();
        //echo $user; die;
        $user->tokens()->delete();
        return response()->json(['success' => true]);
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
