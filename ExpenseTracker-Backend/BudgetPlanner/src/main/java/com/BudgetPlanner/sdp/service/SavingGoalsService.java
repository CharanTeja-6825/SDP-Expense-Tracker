package com.BudgetPlanner.sdp.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BudgetPlanner.sdp.modal.SavingGoals;
import com.BudgetPlanner.sdp.repo.SavingGoalsRepository;

@Service
public class SavingGoalsService {
	
	@Autowired
	SavingGoalsRepository savingRepo;
	
	public SavingGoals create(SavingGoals goal) {
		return savingRepo.save(goal);
	}
	
	public void deleteGoal(Long id) {
		if(!savingRepo.existsById(id))
			throw new RuntimeException("no saving Goals found");
		savingRepo.deleteById(id);
	}
	
	public List<SavingGoals> getAllSavingGoalsByUserId(Long id){
		List<SavingGoals> goals=savingRepo.getAllSavingGoalsByUserId(id);
		return goals;
	}
	
	public void addAmount(Long id,Long amount) {
		SavingGoals goal=savingRepo.getById(id);
		Long curamount=goal.getCurrentamount()+amount;
		goal.setCurrentamount(curamount);
	}
	
}
