import 'package:flutter/material.dart';

class PregnancyWeekCard extends StatelessWidget {
  const PregnancyWeekCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Color(0xFFFCE7E8), // Light pink background
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Pregnancy Week indicator
          Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: Colors.green,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                'Pregnancy Week',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Colors.black,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          
          // Week info
          Text(
            '39 Weeks',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Color(0xFFE91E63), // Pink color from image
            ),
          ),
          const SizedBox(height: 4),
          Text(
            '& 0 days',
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Third Trimester - 92% Complete',
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 12),
          
          // Progress bar with Week labels
          Row(
            children: [
              Text(
                'Week 1',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
              ),
              Expanded(
                child: Container(
                  margin: EdgeInsets.symmetric(horizontal: 8),
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey[300],
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: FractionallySizedBox(
                    alignment: Alignment.centerLeft,
                    widthFactor: 0.92,
                    child: Container(
                      decoration: BoxDecoration(
                        color: Color(0xFF2196F3), // Blue color from image
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                ),
              ),
              Text(
                'Week 40',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          // This Week's Details button
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: Color(0xFF2196F3), // Blue button
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'This Week\'s Details',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          const SizedBox(height: 16),
          
          // Baby illustration and stats row
          Row(
            children: [
              // Baby illustration
              Expanded(
                flex: 2,
                child: Container(
                  height: 120,
                  decoration: BoxDecoration(
                    color: Colors.pink[100],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Center(
                    child: Icon(
                      Icons.child_care,
                      size: 60,
                      color: Color(0xFFE91E63),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              
              // Circular stats in 2x2 grid
              Expanded(
                flex: 1,
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: _CircularStat(
                            value: '48cm',
                            label: 'length',
                            color: Color(0xFFE91E63), // Pink
                            size: 50,
                          ),
                        ),
                        SizedBox(width: 8),
                        Expanded(
                          child: _CircularStat(
                            value: '2.5 kg',
                            label: 'weight',
                            color: Color(0xFFFFEB3B), // Yellow
                            size: 50,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: _CircularStat(
                            value: '140',
                            icon: Icons.favorite,
                            color: Color(0xFF4CAF50), // Green
                            size: 50,
                          ),
                        ),
                        SizedBox(width: 8),
                        Expanded(
                          child: _CircularStat(
                            value: 'Happy',
                            label: 'mood',
                            color: Color(0xFF00BCD4), // Cyan
                            size: 50,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _CircularStat extends StatelessWidget {
  final String value;
  final String? label;
  final IconData? icon;
  final Color color;
  final double size;

  const _CircularStat({
    required this.value,
    this.label,
    this.icon,
    required this.color,
    required this.size,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null)
              Icon(
                icon,
                color: Colors.white,
                size: 16,
              ),
            Text(
              value,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: value.length > 4 ? 9 : 11,
              ),
              textAlign: TextAlign.center,
            ),
            if (label != null)
              Text(
                label!,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 8,
                ),
                textAlign: TextAlign.center,
              ),
          ],
        ),
      ),
    );
  }
}
