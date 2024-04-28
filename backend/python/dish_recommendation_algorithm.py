print("PYTHON CODE IS RUNNING")

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import sys
import certifi
import math
uri = "mongodb+srv://user:user@icsi518-mongodb-cluster.a8atea8.mongodb.net/?retryWrites=true&w=majority&appName=icsi518-mongodb-cluster"
# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=certifi.where())
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    ####print("Pinged your deployment. You successfully connected to MongoDB!")
    ####print("now that we've successfully connected - what is the client: ", client)
    ########print(client.potluck.dishrecommendationtests)
except Exception as e:
    print(e)

# Implement functions to calculate ordinal feature list
def ordinalFeatureComputation(entity):
    # Step 1: create a set of if statments to determine the "grade" of the time it takes to make

    # Define the aggregation pipeline
    pipeline = [
        {
            "$group": {
                "_id": None,
                "maxValue": {"$max": "$preparationTime"}  # Replace "columnName" with the actual name of your column/field
            }
        }
    ]
    # Execute the aggregation pipeline
    result = list(dishCollection.aggregate(pipeline))
    # Extract the maximum value
    max_value = result[0]["maxValue"]


    ## Same steps for the minimum value
    # Define the aggregation pipeline
    pipeline = [
        {
            "$group": {
                "_id": None,
                "minValue": {"$min": "$preparationTime"}  # Replace "columnName" with the actual name of your column/field
            }
        }
    ]
    # Execute the aggregation pipeline
    result = list(dishCollection.aggregate(pipeline))
    # Extract the maximum value
    min_value = result[0]["minValue"]

    differenceFromMin = entity['preparationTime'] - min_value
    entireRange = max_value - min_value
    preparationTimeScore = math.ceil(differenceFromMin/entireRange * 10)
    complexityAndPopularityDict = {"Low" : 1, "Medium" : 2, "High" : 3}
    # Step 2: calculate complexity mapping based on the entity
    complexityScore = complexityAndPopularityDict.get(entity['complexity'])
    # Step 3: calculate popularity mapping based on the entity
    popularityScore = complexityAndPopularityDict.get(entity['popularity'])
    return [preparationTimeScore, complexityScore, popularityScore]

# Params: the datapoints for the "participant" and "dish", respectively (to be compared)
# return: the score respenting the overall similarity
def calculate_score(dish):
    score = 0

    # calculation of the score based on euclidian functions
    ## take points values for: the oridinal values of preparation time, complexity, and populatrity (grouped into a singlepoint)

    participantOrdinalFeatures = ordinalFeatureComputation(user_event_preferences)
    dishOrdinalFeatures = ordinalFeatureComputation(dish)
    score += math.dist(participantOrdinalFeatures, dishOrdinalFeatures)


    ## take nominal values for (can't use euclidian distances)
    ### likely take the inverse (or complement) to account for lower things
    ### ingredient text comparison:
    ####score += (1 - textComparison(user_document['allergens'], dish['ingredients']))
    # Add more matching criteria and weights as needed
    return score

## Note: we haven't actually filtered these yet
## Helper function for further filtering the dish set - checking for user allergens and event cuisine (to be called in the recommendation algorithm)
def dishSetAllergenFilter(document):
    # Comparison to the allergens of the USER
    for dishAllergen in document['allergens']:
        for userAllergen in user_document['allergens']:
            # If you have any equality, you know that you can't include this document, so return false
            if (dishAllergen == userAllergen):
                ####print('In the extra filter allergens section - what is the conflicting allergen?: ', dishAllergen, ", ", userAllergen)
                return False
    return True

    

def dishSetCuisineFilter(document):
    # Comparison to the cusines of the EVENT
    # common cusines list (you must have at least one to return true)
    commonCuisinesList = []
    for dishCuisine in document['cuisines']:
        for eventCuisine in event_cuisines:
            # Keep track of the matches
            if (dishCuisine == eventCuisine):
                ####print("In the extra filter cusines section. Do we ever have a matching cuisine?: ", dishCuisine, ", ", eventCuisine)
                commonCuisinesList.append(dishCuisine)
    if (len(commonCuisinesList) == 0):
        return False
    return True


## Algorithm 
# TODO: if we have a fixed user ID, maybe remove the participant preferences field
def recommend_dishes():
    recommended_dishes = []
    
    for dish in dish_set:
        # before computing the score and appending - check whether either of the "extra filters" are false
        if (dishSetAllergenFilter(dish) == False or dishSetCuisineFilter(dish) == False):
            ####print("Made it to where the extra filter is false for user: ", user_document['firstName'], user_document['lastName'])
            continue
        ########print('In the recommend_dishes algorithm. Do we ever make it past the extra filter??')
        score = calculate_score(dish)
        # Append all dishes with their scores
        recommended_dishes.append((dish, score))
    # sort in ascending order, since the preferred dishes have the lowest scores
    recommended_dishes.sort(key=lambda x: x[1], reverse=False)
    # at the end, take the top 3 (if more than 3 exist)
    if (len(recommended_dishes) < 3):
        # in this case, run the loop again to check for extra dishes without allergens
        
        

        dish_set2 = dishCollection.find({'course' : meal_course,
        'dietaryRestrictions' : {"$all" : user_document['dietaryRestrictions']}
        })

        recommended_dishes_extra = []


    
        for dish in dish_set2:
            ####print("THERE IS A DISH IN THE SECOND DISH SET")
            ####print("IT IS: ", dish)
            # ONLY check the allergens this time
            if (dishSetAllergenFilter(dish) == False):
                continue
            ########print('In the recommend_dishes algorithm. Do we ever make it past the extra filter??')
            score = calculate_score(dish)
            # Append all dishes with their scores
            recommended_dishes_extra.append((dish, score))
        # sort in ascending order, since the preferred dishes have the lowest scores
        recommended_dishes_extra.sort(key=lambda x: x[1], reverse=False)



        # append the difference up to 3 before returning
        lengthDifference = 3 - len(recommended_dishes)

        for i in range(lengthDifference):
            recommended_dishes.append(recommended_dishes_extra[i])
        return recommended_dishes
    else:
        return recommended_dishes[0:3]

# Issue when actually asccessing data: do we need to access the database attribute first, or is it already there?

dishCollection = client.potluck.dishes
# Query the collection (this example retrieves all documents)
dish_cursor = dishCollection.find({})
user_id = sys.argv[1]

userCollection = client.potluck.users
user_cursor = userCollection.find({'_id': ObjectId(user_id)})
# Note: you should break after the first one
user_document = {}
for document in user_cursor:
    user_document = document
    break

# Make an event document similar to the user document
event_id = sys.argv[2]
eventCollection = client.potluck.events
event_cursor = eventCollection.find({'_id': ObjectId(event_id)})
# Note: you should break after the first one
event_document = {}
for document in event_cursor:
    event_document = document
    break

## Hard coding the cusines and the meal course
event_cuisines = event_document['cuisines']
meal_course = sys.argv[3]

## TODO: hardcode the NON-filters - just COMPARISIONS for the loop (complexity, preparation time, popularity)
user_event_preferences = {"preparationTime" : int(sys.argv[4]), "complexity" : sys.argv[5], "popularity" : sys.argv[6]}

## Actually APPLY the filters to dish set (theme, dietary restrictions, allergens, course of the meal, dish being available)

dishSignupCollection = client.potluck.dishsignups
dish_signup_list = []
# Todo later: add to the find condition - 'event' : sys.argv[7]
dish_signup_cursor = dishSignupCollection.find({})
for document in dish_signup_cursor:
    dish_signup_list.append(document['dish'])

dish_set = dishCollection.find({'course' : meal_course,
'dietaryRestrictions' : {"$all" : user_document['dietaryRestrictions']}
# Note: we could just NOT include this, and just the user know (but it may be eaiest to just filter out as I have been doing)
####'_id' : {"$nin" : dish_signup_list}
})

# Calling of the recommendation algorithm:

dishes_for_user = recommend_dishes()
# Close the connection when done (after calling all the algorithms)
client.close()


#"Closing step" of the algorithm: return the dishes for user when the spawned instance closes
## (store the IDS in a text file by unique user ID)
## *to keep things simple, we can just return the ID of the dish
fileName = str(user_document['_id']) + '_dishes.txt'

# Open the file in write (and overwrite) mode
with open(fileName, "w") as file:
    # Keep track of count so it is known when we get to the last index of the dishes
    count = 0
    # Write data to the file
    for dish, score in dishes_for_user:
        # Don't add a newline on the last line
        if (count == len(dishes_for_user) - 1):
            file.write(str(dish['_id']))
        else:
            file.write(str(dish['_id']) + '\n')
        count = count + 1

## Final ####print - what are the arguments?
########print('Final ####print - what are the arguments?: ')
########print(sys.argv[0])
########print(sys.argv[1])
########print(sys.argv[2])
########print("Final ####print - what are the dishes for the user?: ", dishes_for_user)
########print("Final ####print - did we get the event cuisines right?: ", event_cuisines)
########print("What are the dietaryRestrictions of the user?: ", user_document['dietaryRestrictions'])


