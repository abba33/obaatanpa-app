import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';

class WeeklyStatsRow extends StatelessWidget {
  const WeeklyStatsRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          StatCircle(day: 'Mon', color: AppColors.primaryWeb),
          StatCircle(day: 'Sat', color: Color(0xFFFFD700)), // Gold
          StatCircle(day: 'Tue', color: Color(0xFF90EE90)), // Light green
          StatCircle(day: 'Wed', color: AppColors.secondaryWeb),
        ],
      ),
    );
  }
}

class StatCircle extends StatelessWidget {
  final String day;
  final Color color;

  const StatCircle({
    super.key,
    required this.day,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Text(
          day,
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        ),
      ),
    );
  }
}
