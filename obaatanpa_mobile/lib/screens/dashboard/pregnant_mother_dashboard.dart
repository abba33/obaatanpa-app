import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class PregnantMotherDashboardScreen extends StatelessWidget {
  const PregnantMotherDashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FB),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _DashboardHeader(),
              const SizedBox(height: 18),
              _HeroCard(),
              const SizedBox(height: 18),
              _QuickCardsRow(),
              const SizedBox(height: 18),
              _ToolsAndProgressRow(),
              const SizedBox(height: 18),
              _BabyThisWeekCard(),
              const SizedBox(height: 18),
              _ArticlesSection(),
              const SizedBox(height: 18),
              _NutritionThisWeekCard(),
              const SizedBox(height: 18),
              _CareToolboxCard(),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}

class _DashboardHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Row(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Obaatanpa', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22, color: Color(0xFFF59297))),
              SizedBox(height: 2),
              Text('Pregnancy Dashboard', style: TextStyle(fontSize: 13, color: Color(0xFF7da8e6))),
            ],
          ),
          const Spacer(),
          Icon(Icons.notifications_none, color: Color(0xFF7da8e6), size: 28),
          const SizedBox(width: 16),
          CircleAvatar(
            radius: 22,
            backgroundColor: Color(0xFF7da8e6),
            child: Icon(Icons.person, color: Colors.white, size: 26),
          ),
        ],
      ),
    );
  }
}

class _HeroCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 8, offset: Offset(0, 4))],
        ),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('18', style: TextStyle(fontSize: 44, fontWeight: FontWeight.bold, color: Color(0xFFF59297))),
                      Text('weeks', style: TextStyle(fontSize: 16, color: Color(0xFF7da8e6))),
                      SizedBox(height: 6),
                      Text('Second Trimester', style: TextStyle(fontSize: 14, color: Color(0xFF7da8e6))),
                      SizedBox(height: 2),
                      Text('45% Complete', style: TextStyle(fontSize: 13, color: Color(0xFFB0B6C1))),
                    ],
                  ),
                  const Spacer(),
                  Column(
                    children: [
                      Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                          color: const Color(0xFF7da8e6),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Icon(Icons.child_friendly, color: Colors.white, size: 40),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFFF59297),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        child: const Text('This Week\'s Details', style: TextStyle(color: Colors.white, fontSize: 12)),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  _HeroStat(icon: Icons.height, label: 'Height', value: '14.2cm'),
                  _HeroStat(icon: Icons.monitor_weight, label: 'Weight', value: '190g'),
                  _HeroStat(icon: Icons.favorite, label: 'BPM', value: '150'),
                  _HeroStat(icon: Icons.emoji_emotions, label: 'Mood', value: 'Active'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HeroStat extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _HeroStat({required this.icon, required this.label, required this.value});
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Color(0xFFF59297), size: 24),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 12, color: Color(0xFFB0B6C1))),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF7da8e6))),
      ],
    );
  }
}

class _QuickCardsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 110,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        children: const [
          _QuickCard(icon: Icons.restaurant, title: "Today's Meal Plan", subtitle: 'Trimester-safe meals'),
          _QuickCard(icon: Icons.fitness_center, title: 'Safe Exercise Tip', subtitle: 'Trimester advice'),
          _QuickCard(icon: Icons.calendar_today, title: 'Upcoming Appointment', subtitle: 'Next visit: 12 May'),
          _QuickCard(icon: Icons.health_and_safety, title: 'Weekly Health Tip', subtitle: 'Monitor baby movements'),
          _QuickCard(icon: Icons.support_agent, title: 'Ask a Midwife', subtitle: 'Expert advice'),
        ],
      ),
    );
  }
}

class _QuickCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  const _QuickCard({required this.icon, required this.title, required this.subtitle});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 170,
      margin: const EdgeInsets.only(right: 14),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0,2))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: Color(0xFFF59297), size: 26),
          const SizedBox(height: 10),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 3),
          Text(subtitle, style: const TextStyle(fontSize: 11, color: Color(0xFFB0B6C1))),
        ],
      ),
    );
  }
}

class _ToolsAndProgressRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          Expanded(
            child: _ToolsGrid(),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: _ProgressCard(),
          ),
        ],
      ),
    );
  }
}

class _ToolsGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Tools & Trackers',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.2,
          children: const [
            _ToolCard(icon: Icons.date_range, title: 'Due Date Calculator'),
            _ToolCard(icon: Icons.monitor_weight, title: 'Weight Gain Tracker'),
            _ToolCard(icon: Icons.child_care, title: 'Baby Size Comparison'),
            _ToolCard(icon: Icons.timer, title: 'Contraction Timer'),
            _ToolCard(icon: Icons.sports_soccer, title: 'Kick Counter'),
            _ToolCard(icon: Icons.bar_chart, title: 'Symptom Tracker'),
          ],
        ),
      ],
    );
  }
}

class _ToolCard extends StatelessWidget {
  final IconData icon;
  final String title;
  const _ToolCard({required this.icon, required this.title});
  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: Color(0xFFF59297), size: 32),
              const SizedBox(height: 12),
              Text(title,
                  textAlign: TextAlign.center,
                  style: TextStyle(fontWeight: FontWeight.w600)),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProgressCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text('Weekly Progress: 45% Complete'),
            SizedBox(height: 8),
            Text('Growth Tracking: +2cm this week'),
            SizedBox(height: 8),
            Text('Mini Chart: [Progress Visualization]'),
          ],
        ),
      ),
    );
  }
}

class _BabyThisWeekCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Week 18: Development Milestones',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              SizedBox(height: 8),
              Text(
                  'Baby is the size of a bell pepper. This week: ears are developing, and baby can hear sounds!'),
              SizedBox(height: 8),
              Text('Watch: Educational Video ▶️',
                  style: TextStyle(color: Color(0xFFF59297))),
            ],
          ),
        ),
      ),
    );
  }
}

class _ArticlesSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Articles',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.3,
            children: const [
              _CareCard(icon: Icons.menu_book, title: 'Articles'),
              _CareCard(icon: Icons.health_and_safety, title: 'Health Tips'),
              _CareCard(icon: Icons.child_care, title: 'Baby Guides'),
              _CareCard(icon: Icons.restaurant, title: 'Nutrition Info'),
              _CareCard(icon: Icons.lightbulb, title: 'Pregnancy Tips'),
              _CareCard(icon: Icons.support_agent, title: 'Emergency & Support'),
              _CareCard(icon: Icons.spa, title: 'Wellness Tools'),
              _CareCard(icon: Icons.chat, title: 'Live Chat'),
            ],
          ),
        ],
      ),
    );
  }
}

class _CareCard extends StatelessWidget {
  final IconData icon;
  final String title;
  const _CareCard({required this.icon, required this.title});
  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: Color(0xFF7da8e6), size: 32),
              const SizedBox(height: 12),
              Text(title,
                  textAlign: TextAlign.center,
                  style: TextStyle(fontWeight: FontWeight.w600)),
            ],
          ),
        ),
      ),
    );
  }
}

class _NutritionThisWeekCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Nutrition This Week',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              SizedBox(height: 8),
              Text(
                  'Your baby is growing rapidly. Ensure you are eating a balanced diet and staying hydrated.'),
              SizedBox(height: 8),
              Text('Recommended Foods: Avocado, Spinach, Sweet Potatoes, Lean Protein'),
            ],
          ),
        ),
      ),
    );
  }
}

class _CareToolboxCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Care Toolbox',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              SizedBox(height: 8),
              Text(
                  'Access a range of tools and resources to support your pregnancy journey.'),
              SizedBox(height: 8),
              Text('Tools: Due Date Calculator, Weight Gain Tracker, Baby Size Comparison'),
            ],
          ),
        ),
      ),
    );
  }
}
