import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Screen imports
import '../screens/home/home_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/dashboard/pregnant_mother_dashboard.dart';
import '../screens/test/test_dashboard_screen.dart';

/// App Router - Navigation configuration for the app
class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/auth/signup', //  Start with signup screen
    routes: [
      // Home route
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
      ),

      // Auth routes
      GoRoute(
        path: '/auth/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),

      GoRoute(
        path: '/auth/signup',
        name: 'signup',
        builder: (context, state) => const SignupScreen(),
      ),

      // Dashboard routes (placeholders for now)
      GoRoute(
        path: '/dashboard',
        name: 'dashboard',
        builder: (context, state) => const Scaffold(
          body: Center(
            child: Text('Dashboard - Coming Soon'),
          ),
        ),
      ),

      GoRoute(
        path: '/dashboard/pregnant-mother',
        name: 'pregnant-dashboard',
        builder: (context, state) => const PregnantMotherDashboardScreen(),
      ),

      // Test route for direct dashboard access
      GoRoute(
        path: '/test/pregnant-dashboard',
        name: 'test-pregnant-dashboard',
        builder: (context, state) => const PregnantMotherDashboardScreen(),
      ),

      // Test route with auto-authentication
      GoRoute(
        path: '/test/dashboard',
        name: 'test-dashboard',
        builder: (context, state) => const TestDashboardScreen(),
      ),

      GoRoute(
        path: '/dashboard/new-mother',
        name: 'new-mother-dashboard',
        builder: (context, state) => const Scaffold(
          body: Center(
            child: Text('New Mother Dashboard - Coming Soon'),
          ),
        ),
      ),

      GoRoute(
        path: '/dashboard/practitioner',
        name: 'practitioner-dashboard',
        builder: (context, state) => const Scaffold(
          body: Center(
            child: Text('Health Practitioner Dashboard - Coming Soon'),
          ),
        ),
      ),

      GoRoute(
        path: '/dashboard/hospital',
        name: 'hospital-dashboard',
        builder: (context, state) => const Scaffold(
          body: Center(
            child: Text('Hospital Dashboard - Coming Soon'),
          ),
        ),
      ),
    ],

    // Error handling
    errorBuilder: (context, state) => Scaffold(
      appBar: AppBar(
        title: const Text('Page Not Found'),
      ),
      body: const Center(
        child: Text('Page not found'),
      ),
    ),
  );
}
